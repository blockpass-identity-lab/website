const path = require('path')

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators
  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve('src/templates/blog.js');
    resolve(
      graphql(`
        {
          allContentfulBlogPost (limit:100) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulBlogPost.edges.forEach((edge) => {
          createPage ({
            path: edge.node.id,
            component: blogTemplate,
            context: {
              id: edge.node.id
            }
          })
        })
      })
    )
  })
}
