import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'
import { RuleTester } from 'eslint'

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

describe('A bid with minimum value', () => {
  test('All bids must have an amount greater than the minimum entered.', () => {
    const wrapper = mount(Lance, {
      // Minimum value is passed via prop
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })
  test('Issue the expected value of a valid bid', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorDoLance = parseInt(lancesEmitidos[0][0])
    expect(valorDoLance).toBe(400)
  })
  test('Bids with values ​​less than the minimum informed are not accepted', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    // Waiting for DOM rendering
    await wrapper.vm.$nextTick()
    // capture our alert
    const msgError = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
    // wait for it to exist
    expect(msgError).toContain(msgEsperada)
  })
})
