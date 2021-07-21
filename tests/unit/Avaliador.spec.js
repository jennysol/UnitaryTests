import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Livro',
    lanceInicial: 50,
    descricao: 'Livro bem bacana'
  },
  {
    produto: 'Soliver',
    lanceInicial: 60,
    descricao: 'Livro bem Legal'
  }
]

describe('An evaluator that connects with the api', () => {
  test('Shows all auctions returned by the api', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length

    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })
})
