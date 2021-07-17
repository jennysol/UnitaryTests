import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('A bid with no minimum value', () => {
  test('Does not accept negative bids', () => {
    const wrapper = mount(Lance)

    // Finding our input
    const input = wrapper.find('input')

    // Sending value
    input.setValue(-100)

    // Listening to Event issued
    const lancesEmitidos = wrapper.emitted('novo-lance')

    // Activating Submit
    wrapper.trigger('submit')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('Place a bid when the value is greater than zero', () => {
    const wrapper = mount(Lance)

    const input = wrapper.find('input')

    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Issue the expected value of a valid bid', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')

    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})
