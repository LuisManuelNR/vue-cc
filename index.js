import cRoot from './src/components/cRoot'
import cAxisX from './src/components/cAxis-x'
import cAxisY from './src/components/cAxis-y'
import cBars from './src/components/cBars'
import cPath from './src/components/cPath'
import cCircle from './src/components/cCircle'
import cc from './src/core'
const graph2dComponents = {
  install (Vue) {
    Vue.component(cRoot.name, cRoot)
    Vue.component(cAxisX.name, cAxisX)
    Vue.component(cAxisY.name, cAxisY)
    Vue.component(cBars.name, cBars)
    Vue.component(cPath.name, cPath)
    Vue.component(cCircle.name, cCircle)
    Vue.prototype.$cc = cc
  }
}

export default graph2dComponents
