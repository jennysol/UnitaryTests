import Leilao from '@/components/Lance'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Book',
  lanceInicial: 49,
  descricao: 'Um maravilhoso livro'
}

describe('Um leilão exibe os dados do produto', () => {
  test('Exibe os dados do leilão no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    expect(wrapper).toBeTruthy()
  })
})
