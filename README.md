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
