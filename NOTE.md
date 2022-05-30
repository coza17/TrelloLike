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
    box-shadow
    Input.TextArea中autoSize={true}出现抖动
    card中div文本换行
        word-break:break-all;
        word-wrap:break-word; 
ok修改卡片
ok删除卡片
ok删除列表
点击添加卡片时滚动条到底
点击添加时聚焦输入框
卡片详情内容
    描述Description
    时间Dates
    清单CheckList
        -itemText
        -date
        -isCheck
    活动Activity
        -comment(换行)
        -time(time、updateTime)
    -modalState不保存卡片详情，只显示状态与卡片ID？
新板块
代码优化

背景透明 rgba
shallowequal?
靠右居中
reverse
对象赋值？