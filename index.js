import cRoot from './components/cRoot'
import cAxisX from './components/cAxis-x'
import cAxisY from './components/cAxis-y'
import cBars from './components/cBars'
import cPath from './components/cPath'
import cCircle from './components/cCircle'
import cGrid from './components/cGrid'
import cc from './core'
const graph2dComponents = {
  install (Vue) {
    Vue.component(cRoot.name, cRoot)
    Vue.component(cAxisX.name, cAxisX)
    Vue.component(cAxisY.name, cAxisY)
    Vue.component(cBars.name, cBars)
    Vue.component(cPath.name, cPath)
    Vue.component(cCircle.name, cCircle)
    Vue.component(cGrid.name, cGrid)
    Vue.prototype.$cc = cc
  }
}

export default graph2dComponents
