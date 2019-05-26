# 云函数接口

## 用户首次登陆，添加用户
name: adduser,
不需要data

成功返回res.mesg == 'new user added'
失败 则为 'user is existed'

## 添加记录
name: addrecord,
data: {
	content: '记录的文本内容', //string
	tags: [标签组],  //数组
	site: '位置文本' //string
}

成功 mesg = 'add successfully'
用户不存在 mesg = 'user is not exist'

## 获取记录(目前没做全部，上限100条)
name: getAllreco
不需要data

返回 recordlist 列表，一个元素即为一条记录

返回为空则无

## 获取用户记录数量和完成比率
name: getnum
data: 不需要

返回
{
	recoNum: 3,
	suceRate: 50
}

## 搜索指定内容的记录
name: searchreco
data: {
searchvalue: '搜索内容'
}

返回 recordlist 列表，时间倒序