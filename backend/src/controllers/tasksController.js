const getAll = (require, response) => {
    return response.status(200).json({message: 'controller está OK!!'});
};

module.exports = {
    getAll
};