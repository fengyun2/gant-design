## datepicker 时间选择器

选择时间

## 说明

接受moment对象,或者时间字符.

时间字符串中如果不带时区信息,将被当作东八区的时间处理,然后转换到当前时区

带时区的字符串形式如下:

`2019-06-12T07:43:09+08:00`或者`2019-06-12 07:43:09+08:00`或者`2019-06-12 07:43:09+0800`

## API

|参数|说明|类型|默认值|
|:-:|:-:|:-:|:-:|
|value| 时间值| moment、string| -
|format|时间格式|string|YYYY-MM-DD
|showTime|是否显示时间选择器|boolean|false
|onChange|选择时间回调|funciton|function(timestr)