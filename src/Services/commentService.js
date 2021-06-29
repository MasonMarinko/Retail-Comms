const apiService = require('./apiService');

const CommentService = {
    create:(data) => {
       return apiService.post("/comment", data)
       .then(result => result.data)
    },
    getAllComments:(data) => {
        return apiService.get('/comment', data)
        .then (result => result.data)
    },
    delete:(commentNumber) => {
        console.log(commentNumber)
        return apiService.delete(`/comment/${commentNumber}`)
        .then (result=>result.data)
    },
    markCommentRead:(commentID, token) => {
        return apiService.post(`/comment/read/${commentID}`, {}, {
            headers: {Authorization: token}
        })
        .then ()
    }
    
}

module.exports = CommentService