import cAxisX from './components/cAxis-x'
import cAxisY from './components/cAxis-y'
import cBars from './components/cBars'
import cPath from './components/cPath'
import cCircle from './components/cCircle'
import cUtils from './utils'
const graph2dComponents = {
  install (Vue) {
    Vue.component(cAxisX.name, cAxisX)
    Vue.component(cAxisY.name, cAxisY)
    Vue.component(cBars.name, cBars)
    Vue.component(cPath.name, cPath)
    Vue.component(cCircle.name, cCircle)
    Vue.prototype.$utils = cUtils
  }
}

export default graph2dComponents
