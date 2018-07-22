import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import RedError from '../RedError';
import marked from 'marked';

@inject('articlesStore', 'userStore', 'articlePageStore')
@withRouter
@observer
export default class Article extends React.Component {
  componentDidMount() {
    const slug = this.props.match.params.id;
    this.props.articlePageStore.setArticle(slug);
  }

  handleDeleteArticle = slug => {
    this.props.articlesStore
      .deleteArticle(slug)
      .then(() => this.props.history.replace('/'));
  };

  render() {
    const { currentUser } = this.props.userStore;
    const { article, comments } = this.props.articlePageStore;

    if (!article) return <RedError message="Can't load article" />;

    const markup = { __html: marked(article.body, { sanitize: true }) };
    const canModify =
      currentUser && currentUser.username === article.author.username;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta
              article={article}
              canModify={canModify}
              onDelete={this.handleDeleteArticle}
            />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup} />

              <ul className="tag-list">
                {article.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions" />

          <div className="row">
            <CommentContainer comments={comments} currentUser={currentUser} />
          </div>
        </div>
      </div>
    );
  }
}
