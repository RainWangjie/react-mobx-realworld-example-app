import { observable, action } from 'mobx';
import { CommentsModel } from '../models/commentsModel';
import articlesStore from './articlesStore';

class ArticlePageStore {
  @observable slug = undefined;
  @observable article = undefined;
  @observable comments = undefined;

  @action
  setArticle = slug => {
    this.slug = slug;
    this.comments = new CommentsModel(slug);
    this.article = articlesStore.getArticle(slug);
  };
}
export default new ArticlePageStore();
