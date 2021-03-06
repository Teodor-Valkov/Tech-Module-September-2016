const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: {type: String, require:true, unique:true},
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
});

tagSchema.method({
    prepareToInsert: function () {
        let Article = mongoose.model('Article');
        for (let article of this.articles) {
            Article.findById(article).then(article => {
                if (article.tags.indexOf(this.id) === -1) {
                    article.tags.push(this.id);
                    article.save();
                }
            });
        }
    },

    deleteArticle: function (articleId) {
        this.articles.remove(articleId);
        this.save();
    }
});

tagSchema.set('versionKey', false);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

module.exports.initializeTags = function (newTags, articleId) {
    for (let newTag of newTags) {
        if (newTag) {
            Tag.findOne({name: newTag}).then(tag => {
                //If the tag exists - insert the article in it.
                if (tag) {
                    if (tag.articles.indexOf(articleId) === -1) {
                        tag.articles.push(articleId);
                        tag.prepareToInsert();
                        tag.save();
                    }
                }
                //If the tag doesn't exist - create it and insert the article in it.
                else {
                    Tag.create({name: newTag}).then(tag => {
                        tag.articles.push(articleId);
                        tag.prepareToInsert();
                        tag.save();
                    })
                }
            });
        }
    }
};