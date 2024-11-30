## authRouter

-POST / signup
-POST / login
-POST / logout

## profileRouter

-GET / profile / view
-GET / Profile / edit
-GET / profile / password

## send connection router

-POST / request/send / ignored /:userId
-POST / request/send / interested/ :userId
-POST / request/ review / accepted / : requestId
-POST / request/ review / / rejected / : requestId

## userRouter

-GET/ user / connection
-GET / user / request
-GET / user / feed -- gets you profile of others user in your platfrom
