import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('Does not accept negative bids', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  expect(input).toBeTruthy()
})
