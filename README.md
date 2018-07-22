# MVVM

![mvvm](http://o830wpqbz.bkt.clouddn.com/mvvm-3.png)

**JSX/TSX**：引用 mobx-react 和 store(VM)；;

**Store（Model 的集合）**：也是 mobX 对象（包含 UI 属性，Model 实例，Model 的 Computed 值--可见性属性），实例化一个（多个）Model，event/call 触发 Model 内的 action 修改 observable；

**Model**：服务端源数据的抽象，包括 action（CRUD,filter），Loading

## Model 数据模型

- `page` 不可复用
- `module` maybe 可复用
- `component` 可复用
- `instance` 可复用，可能全局唯一

## 重新定义 Model、Store

**Store**:mobX 对象实例化后，`page`，唯一`instance`（User、articles）,view 内唯一（comments,article）

**Model**:mobX 对象声明，`module`（comments,article）

## 改造计划

-  从`articlesStore`抽取`articleModel`
- `articleList`引入`articleModel`的实例（替代原`articlesStore`），增加一个 Page（Module）级 Store
-  抽象`commentsModel`,在`articleListStore`内实例化

## 问题

- 该项目的 article 的抽象不透明，项目内以 articles 为一个整体实例，且做了缓存；
- comments 部分使用父子组件 props 传值，commentsIuput 又直接调用 commonsStore 内的 func，抽象 commentsModel 的意义不大，（该项目内未复用）

假设 commentsModel、articleModel 都完成抽象。articlesStore 内引用 articleModel 的实例，在 artilcePageStore 内实例化一个 commentsModel，引用 articlesStore 已实例化的 article（有缓存）。comments 组件只能通过父子组件 props 传递 commentsModel 的实例（或引用 artilcePageStore），使开发更复杂。尝试了一下已**放弃**

## 总结

code 完（已失败）

目前想法：

- init 阶段， 实例化所有的 store（接近目前项目的做法），store 包括（page、module、global/ 视图上唯一对象），数据模型包含在 store 内；
- 数据模型的定义可以用 type/interface 代替（陈垚的想法）

附：尝试的各种失败的想法

![mvvm](http://o830wpqbz.bkt.clouddn.com/mvvm.png)
![mvvm](http://o830wpqbz.bkt.clouddn.com/mvvm-2.png)
