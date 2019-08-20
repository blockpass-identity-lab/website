const path = require('path')

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators
  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve('src/templates/blog.js');
    const memberTemplate = path.resolve('src/templates/member.js');
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
          allContentfulMember (limit:100) {
            edges {
              node {
                id
                name
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

        result.data.allContentfulMember.edges.forEach((edge) => {
          createPage({
            path: edge.node.name,
            component: memberTemplate,
            context: {
              id: edge.node.id
            }
          })
        })
      })
    )
  })
}
