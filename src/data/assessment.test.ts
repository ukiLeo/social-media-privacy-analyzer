import { describe, expect, it } from 'vitest'
import { assessmentCategories, calculateAssessment } from './assessment'

const answersFor = (mode: 'safe' | 'risk' | 'uncertain') =>
  Object.fromEntries(assessmentCategories.flatMap((category) =>
    category.questions.map((question) => [question.id, mode === 'safe' ? question.options[0] : mode === 'uncertain' ? 'Not sure' : question.options[question.options.length - 1]]),
  ))

describe('calculateAssessment', () => {
  it('awards the full 100 points for safest answers', () => {
    const result = calculateAssessment(answersFor('safe'))
    expect(result.total).toBe(100)
    expect(result.categories.map((category) => category.score)).toEqual([30, 30, 25, 15])
  })

  it('awards zero for risky answers', () => {
    expect(calculateAssessment(answersFor('risk')).total).toBe(0)
  })

  it('treats uncertain answers as awareness gaps', () => {
    expect(calculateAssessment(answersFor('uncertain')).total).toBe(0)
    expect(calculateAssessment(answersFor('uncertain')).band).toBe('High Risk Practices')
  })

  it('keeps category totals consistent with the overall score', () => {
    const result = calculateAssessment({ private: 'Yes', followers: 'Sometimes', settings: 'Never', twofa: 'Yes', password: 'Not sure', otp: 'Always' })
    expect(result.total).toBe(result.categories.reduce((sum, category) => sum + category.score, 0))
  })
})
