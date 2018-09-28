module.exports = (pageLimit, maxLimit) => {
    const limit = (typeof pageLimit === 'number') ? parseInt(limit, 10) : 10;
    const max = (typeof maxLimit === 'number') ? parseInt(max, 10): 50;
    return (req, res, next) => {
        req.query.page = (typeof req.query.page === 'string') ? parseInt(req.query.page, 10) || 1 : 1;
        req.query.limit = (typeof req.query.limit === 'string') ? parseInt(req.query.limit, 10) || 0 : limit;

        if (req.query.limit > max) {
            req.query.limit = max;
        }

        if (req.query.limit < 0) {
            req.query.page = 1;
        }

        if (req.query.page < 1) {
            req.query.page = 1;
        }

        req.skip = (req.query.page * req.query.limit) - req.query.limit;

        res.locals.pagination = {};
        res.locals.pagination.page = req.query.page;
        res.locals.pagination.page_size = req.query.limit;
        //res.locals.pagination.uri = req.query;

        next();
    }
}

/*
uri
first_page
next_page
previous_page
page
page_size
*/