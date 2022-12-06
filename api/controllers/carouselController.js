const jwt = require('jsonwebtoken');

/** Importing Models */
const { CarouselModel, CarouselModelMethods } = require('../models');

class CarouselController {
    constructor() {
        this.CarouselModel = CarouselModel;
    }

    save(req, res, next) {
        const postBody = {};
        postBody.userEmail = req.body.userEmail;
        postBody.carousel = JSON.stringify(req.body.carousels);
        postBody.thumbnail = req.body.thumbnail;
        let newThumbnail;
        this.CarouselModel.findOne(
            {
                userEmail: postBody.userEmail
            },
            {
                userEmail: 1,
                thumbnail: 1,
                carousel: 1
            }
        ).then((carousel) => {
            if (carousel == null) {
                return this.CarouselModel(postBody)
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            status: "success",
                            MSG: "Successfully Created!!!"
                        });
                    });
            } else {
                this.CarouselModel.findOneAndUpdate(
                    {
                        userEmail: postBody.userEmail
                    },
                    {
                        thumbnail: carousel.thumbnail + "," + postBody.thumbnail,
                        carousel: carousel.carousel + ",,," + postBody.carousel
                    }
                ).then((carousel) => {
                    return res.status(201).json({
                        status: "success",
                        MSG: "Successfully Updated with new Thumbnail"
                    });
                });
            }
        });
    }

    get_savedCarousel(req, res, next) {
        const postBody = {};
        postBody.userEmail = req.body.email;
        // return this.CarouselModel.find()
        return this.CarouselModel.find(
            {
                userEmail: postBody.userEmail
            },
            {
                userEmail: 1,
                carousel: 1,
                thumbnail: 1,
                createdAt: 1,
            },
        ).then(response => res.json({
            data: {
                status: "success",
                userEmail: response[0].userEmail,
                carousel: response[0].carousel,
                thumbnail: response[0].thumbnail
            }
        }))
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = new CarouselController();
