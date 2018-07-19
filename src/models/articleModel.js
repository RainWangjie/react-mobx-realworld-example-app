import { observable, action } from 'mobx';
import agent from '../agent';

export class articleModel {
  @observable articleSlug = undefined;
  @observable artilce;

  constructor(slug) {
    this.articleSlug = slug;
  }

  @action
  setArticle(article) {
    this.article = article;
  }
}

export default articleModel;
