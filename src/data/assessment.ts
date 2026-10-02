export type Platform = 'Instagram' | 'Facebook' | 'Snapchat' | 'Other'
export type Answers = Record<string, string>
export type Question = { id: string; prompt: string; options: string[]; scores: Record<string, number>; recommendation?: string }
export type Category = { id: string; title: string; description: string; max: number; questions: Question[] }
export type ScoreResult = { total: number; band: string; categories: { id: string; title: string; score: number; max: number }[]; insights: { type: 'safe' | 'risk' | 'uncertain'; text: string }[]; recommendations: string[] }

const q = (id: string, prompt: string, options: string[], safe: string, partial: string, recommendation?: string): Question => ({ id, prompt, options, scores: Object.fromEntries(options.map((o) => [o, o === safe ? 1 : o === partial ? 0.5 : 0])), recommendation })
export const assessmentCategories: Category[] = [
  { id: 'privacy', title: 'Account Privacy', description: 'How visible and intentional are your account settings?', max: 30, questions: [
    q('private', 'Is your social media account set to private?', ['Yes', 'No', 'Not sure'], 'Yes', '', 'Review your account privacy settings.'),
    q('followers', 'Do you regularly review your followers or friends list?', ['Regularly', 'Sometimes', 'Never'], 'Regularly', 'Sometimes', 'Review and remove unfamiliar followers.'),
    q('settings', "How often do you review your account's privacy settings?", ['Regularly', 'Occasionally', 'Never'], 'Regularly', 'Occasionally', 'Schedule a monthly privacy settings check.'),
  ] },
  { id: 'login', title: 'Login Security', description: 'Strong sign-in habits make account takeovers much harder.', max: 30, questions: [
    q('twofa', 'Do you use two-factor authentication (2FA)?', ['Yes', 'No', 'Not sure'], 'Yes', '', 'Enable two-factor authentication.'),
    q('password', 'Do you use a strong and unique password for your social media account?', ['Yes', 'No', 'Not sure'], 'Yes', '', 'Use a strong, unique password.'),
    q('otp', 'Do you avoid sharing your OTP or login codes with others?', ['Always', 'Sometimes', 'Never'], 'Always', 'Sometimes', 'Never share OTPs or login codes.'),
  ] },
  { id: 'sharing', title: 'Personal Information Sharing', description: 'Your digital footprint is shaped by what you choose to share.', max: 25, questions: [
    q('details', 'Do you share your phone number, address, or other sensitive personal details publicly?', ['Never', 'Sometimes', 'Frequently'], 'Never', 'Sometimes', 'Avoid sharing sensitive information publicly.'),
    q('location', 'Do you share your live location or real-time whereabouts publicly?', ['Never', 'Sometimes', 'Frequently'], 'Never', 'Sometimes', 'Keep live location and routines private.'),
    q('audience', 'Do you check the privacy of your posts and stories before sharing?', ['Always', 'Sometimes', 'Never'], 'Always', 'Sometimes', 'Check your audience before posting.'),
  ] },
  { id: 'interactions', title: 'Online Interactions', description: 'Boundaries and a pause-before-clicking protect your digital space.', max: 15, questions: [
    q('unknown', 'Do you accept friend or follow requests from unknown people?', ['Never', 'Sometimes', 'Frequently'], 'Never', 'Sometimes', 'Avoid accepting requests from unknown users.'),
    q('links', 'Do you verify suspicious links before clicking them?', ['Always', 'Sometimes', 'Never'], 'Always', 'Sometimes', 'Verify links before clicking them.'),
    q('report', 'Do you know how to block and report suspicious accounts?', ['Yes', 'No', 'Not sure'], 'Yes', '', 'Learn how to block and report suspicious accounts.'),
  ] },
]
export function calculateAssessment(answers: Answers): ScoreResult {
  const categories = assessmentCategories.map((category) => {
    const base = Math.floor(category.max / category.questions.length)
    const remainder = category.max % category.questions.length
    const score = category.questions.reduce((sum, question, index) => sum + Math.round((base + (index < remainder ? 1 : 0)) * (question.scores[answers[question.id]] ?? 0)), 0)
    return { id: category.id, title: category.title, score, max: category.max }
  })
  const insights: ScoreResult['insights'] = []; const recommendations = new Set<string>()
  assessmentCategories.forEach((category) => category.questions.forEach((question) => { const value = answers[question.id]; const score = question.scores[value] ?? 0; if (score === 1) insights.push({ type: 'safe', text: `${question.prompt.replace('?', '')}: ${value}.` }); else if (score === 0) { insights.push({ type: value === 'Not sure' ? 'uncertain' : 'risk', text: `${question.prompt.replace('?', '')}: ${value || 'Not answered'}.` }); if (question.recommendation) recommendations.add(question.recommendation) } }))
  const total = categories.reduce((sum, c) => sum + c.score, 0)
  const band = total >= 80 ? 'Strong Privacy Practices' : total >= 60 ? 'Moderate Privacy Practices' : total >= 40 ? 'Needs Improvement' : 'High Risk Practices'
  return { total, band, categories, insights: insights.slice(0, 8), recommendations: [...recommendations] }
}
