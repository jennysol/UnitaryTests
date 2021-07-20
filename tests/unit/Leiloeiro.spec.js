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

const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 1002,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 1003,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  }
]

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

describe('An auctioneer displays existing bids', () => {
  test('Does not show "No bids" warning', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(false)
  })
  test('Auctioneer has a list of bids', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const alerta = wrapper.find('.list-inline')
    expect(alerta.exists()).toBe(true)
  })
})

describe('An auctioneer communicates the highest and lowest bid amounts', () => {
  test('Shows the highest bid for that auction', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1003')
  })
  test('Shows the lowest bid for that auction', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
  })
})
