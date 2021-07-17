import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

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
