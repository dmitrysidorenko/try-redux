class ArticleReaderComponentController {
    constructor({article, onWordSelected=()=> {
    }}) {
        this.words = ArticleReaderComponentController.splitArticleByWords(article);
        this.article = article;
        this.selectedWord = null;
        this.selectedWordsSet = new WeakSet();
        this.onWordSelected = onWordSelected;
    }

    onWordClicked(word) {
        var wasSelected = this.selectedWordsSet.has(word);
        this.selectedWordsSet.delete(this.selectedWord);
        if (wasSelected) {
            this.selectedWord = null;
        } else {
            this.selectedWordsSet.add(word);
            this.selectedWord = word;
        }
        this.onWordSelected({
            word: this.selectedWord
        });
    }

    static splitArticleByWords(article) {
        return article.text.split(/\s+/).map((text, index)=>({text, id: index + 1}));
    }
}

ArticleReaderComponentController.$inject = [
    'params'
];

export {ArticleReaderComponentController}
