let _promises = []

const PromiseManager = {
  reset: () => (_promises = []),
  get: () => _promises,
  add: (promise) => {
    _promises.push(promise)
  }
}

Object.freeze(PromiseManager)
export default PromiseManager
