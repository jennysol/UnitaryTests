import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

// Declaring Router Simulator
const $router = {
  push: jest.fn()
}

describe('A new auction must be created.', () => {
  test('Given the completed form an auction must be created.', () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      // Montando simulador
      mocks: {
        $router
      }
    })

    wrapper.find('.produto').setValue('Book')
    wrapper.find('.descricao').setValue('Conteúdo maravilhoso')
    wrapper.find('.value').setValue(50)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
