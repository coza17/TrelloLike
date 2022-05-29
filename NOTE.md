ok Unable to find draggable with id: 0
关闭 React.StrictMode

拓展运算符只深拷贝一维数组

ok拖拽显示闪屏
    margin?
        样式写于最外层
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={styles.body} >
ok列表高度变化
    flex
ok拖拽时列表 center 高度减小，无法放置于列表尾部
    flex?
ok拖入与拖出时高度没增加，最底下背景色纯白，放下时增加。
ok拿出时高度减少、放下时高度增加
    {provided.placeholder}位置错误
ok最底部拖拽时闪，先在占位下再删除占位？ 
    由于存在滚动条，影响拖拽位置判断？
    容器或父级可滚动，而非子容器。
    {...provided.droppableProps} ref={provided.innerRef}与overflow:auto同容器
    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/auto-scrolling.md
ok列表拖拽
    占位失效？
    设置方向
    The direction in which items flow in this droppable. Options are 
    vertical (default) and horizontal 水平.
flex 列方向 不设置高度超出 设置固定高度不超出？？
    src\pages\Trello\index.module.less
ok添加列表
ok添加卡片
添加样式优化
ok修改卡片
删除卡片
删除列表

卡片详情内容
    state
新板块