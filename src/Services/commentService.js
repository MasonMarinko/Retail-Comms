const apiService = require('./apiService');

const CommentService = {
    create:(data) => {
       return apiService.post("/comment", data)
       .then(result => result.data)
    },
    getAllComments:(data) => {
        return apiService.get("/comment", data)
        .then (result => result.data)
    },
    delete:(commentID) => {
        return apiService.delete(`/comment/${commentID}`)
        .then ((results) => {
        })
    },
    markCommentRead:(commentID, token) => {
        return apiService.post(`/comment/read/${commentID}`, {}, {
            headers: {Authorization: token}
        })
        .then ()
    }
    
}

module.exports = CommentService