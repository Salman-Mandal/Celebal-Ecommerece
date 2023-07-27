class Apifeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.name ? {
            name: {
                $regex: this.querystr.name,
                $options: "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword });

        return this;
    }
    filter() {
        const querycopy = { ...this.querystr };

        //removing feilds for category
        const removeFeilds = ["name", "page", "limit"];

        removeFeilds.forEach((key) => delete querycopy[key]);


        // this is for price
        let querystr = JSON.stringify(querycopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));

        return this;

    }
    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;

        const skip=resultPerPage * (currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = Apifeatures;