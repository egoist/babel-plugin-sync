const MAKE_ME_SYNC = '$MakeMeSync'

const shouldMakeSync = comments => {
  return (
    comments &&
    comments.find(comment => {
      return comment.value.trim() === MAKE_ME_SYNC
    })
  )
}

const markAsSynced = node => {
  node.leadingComments = node.leadingComments.map(c => {
    if (c.value.trim() === MAKE_ME_SYNC) {
      c.value = ' __SYNCED__'
    }
    return c
  })
}

const syncCallee = callee => {
  if (callee.type === 'MemberExpression') {
    callee.property.name += 'Sync'
  } else {
    callee.name += 'Sync'
  }
}

module.exports = function ({ types: t }) {
  return {
    name: 'sync',

    visitor: {
      ClassMethod(path) {
        if (path.node.async && shouldMakeSync(path.node.leadingComments)) {
          markAsSynced(path.node)
          const originalNode = t.cloneDeep(path.node)

          path.node.trailingComments = originalNode.trailingComments
          originalNode.trailingComments = []

          path.insertBefore(originalNode)

          path.node.async = false
          path.node.key.name += 'Sync'

          path.traverse({
            AwaitExpression(path) {
              const { callee } = path.node.argument
              syncCallee(callee)
              path.replaceWith(path.node.argument)
            },
            CallExpression(path) {
              if (
                path.parent.type === 'ReturnStatement' &&
                shouldMakeSync(path.parent.trailingComments)
              ) {
                syncCallee(path.node.callee)
              }
            }
          })
        }
      }
    }
  }
}
