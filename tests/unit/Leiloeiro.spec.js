import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLances, getLeilao } from '@/http'
import flushPromises from 'flush-promises'

// Pedindo ao Jest para simular o http e retornar o que pedirmos 
jest.mock('@/http')

const leilao = {
  produto: 'Livro',
  lanceInicial: 50,
  descricao: 'Livro bem bacana'
}

describe('Auctioneer starts an auction that has no bids', () => {
  test('Notify me when there are no bids', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')

    expect(alerta.exists()).toBe(true)
  })
})
