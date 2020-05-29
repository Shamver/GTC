// Enables error handling of async functions.
export default function async(func) {
  return (req, res, next) => {
    func(req, res, next).catch((v) => next(v));
  };
}
