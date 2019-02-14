export function insert(db, event, query) {
  db.insert(query, (err, newDoc) => event.returnValue = { err, newDoc })
}

export function find(db, event, query, options) {
  if (options === {} || options === undefined || options === null) {
    db.find(query, (err, docs) => event.returnValue = { err, docs })
  } else {
    db.find(query)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit)
      .exec((err, docs) => event.returnValue = { err, docs })
  }
}

export function findOne(db, event, query) {
  db.findOne(query, (err, docs) => event.returnValue = { err, docs })
}

/**
 *
 * @param db
 * @param query 与find和findOne中query参数的用法一致
 * @param update 指定文档更改规则。该参数可以是一个新的文档，也可以是一套修饰符，两者不能同时使用。
 *              使用修饰符时，如果需要更改的字段不存在，将会自动创建。
 *              可用的修饰符有$set(改变字段值), $unset(删除某一字段), $inc(增加某一字段),
 *              $min/$max(改变字段值，传入值需要小于/大于当前值),
 *              还有一些用在数组上的修饰符，$push, $pop, $addTopSet, $pull, $each, $slice
 * @param options object类型。muti(默认false)，是否允许修改多条文档；upsert(默认为false)，
 *              如果query没有匹配到结果集，有两种情况需要考虑，
 *              一个是update是一个简单的对象(不包含任何修饰符)，
 *              另一种情况是带有修饰符，对第一种情况会直接将该文档插入，
 *              对第二种情况会将通过修饰符更改后的文档插入；
 */
export function update(db, event, { query, update, options }) {
  db.update(query, update, options, (err, numReplaced) => event.returnValue = { err, numReplaced })
}

export function remove(db, event, { query, options }) {
  db.remove(query, options, (err, numRemoved) => event.returnValue = { err, numRemoved })
}

export function count(db, event, query) {
  db.count(query, (err,  count) => event.returnValue = { err, count })
}
