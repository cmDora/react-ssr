import {
  observable,
  computed,
  action,
} from 'mobx'

// 定义 class 的原因：
// 因为使用 @computed 等装饰器时，用在 class 里面是最好的
// 而且定义在 class 里面，能够更方便组织整个 store，因为一个 store 就是一个 class 的实例，这样使用起来比较方便。
// 可以在里面使用 this 来调用
export class AppState {
  @observable count = 0

  @observable name = 'Jocky'

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState()

export default appState
