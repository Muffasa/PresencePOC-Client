angular.module("register-service",[])

.factory("RegisterS",['$rootScope','$q','ServerComS','UserS','AuthS',
        function($rootScope,$q,ServerComS,UserS,AuthS){

	var sendPhoneNumberToServer = function(tempUser){
		var d =$q.defer()
        ServerComS.sendPhoneNumberToServer(tempUser).then(function(res){
            d.resolve(res)
        },function(err){
        	d.reject()
        })
        return d.promise
	}
	var validateSmsCode = function(tempUser,code){
		var d =$q.defer()
        ServerComS.validateSmsCode(tempUser,code).then(function(res){

        	window.localStorage.setItem('MPN',JSON.stringify(tempUser.MPN))
            d.resolve(res)
        },function(err){
        	d.reject()
        })
        return d.promise
	}
	var createStudentUser = function(tempUser){
		var d =$q.defer()
		var hashedPassword = tempUser.password //TODO hash the password before sending it to the server
		var student = {
			fullName:tempUser.fullName,
            MPN:tempUser.MPN,
			ID:tempUser.ID,
            hashedPassword:hashedPassword
		}
        ServerComS.createStudentUser(student).then(function(res){
            window.localStorage.setItem('uid',res.data.uid)
            window.localStorage.setItem('authToken',res.data.authToken)
        	window.localStorage.setItem('ID',tempUser.ID)
        	window.localStorage.setItem('fullName',tempUser.fullName)
        	AuthS.auth().then(function(res){
        		d.resolve(res)
        	},function(err){
        		d.reject(err)
        	})
            
        },function(err){
        	d.reject(err)
        })
        return d.promise
	}
	var createMasterUser = function(tempUser){
		var d =$q.defer()
		var hashedPassword = tempUser.password  //TODO hash the password before sending it to the server
		var master = {
			fullName:tempUser.fullName,
			MPN:tempUser.MPN,
			ID:tempUser.ID,
            hashedPassword:hashedPassword,
			activationCode:tempUser.activationCode
		}
        ServerComS.createMasterUser(master).then(function(res){
            window.localStorage.setItem('uid',res.data.uid)
            window.localStorage.setItem('authToken',res.data.authToken)
        	window.localStorage.setItem('ID',tempUser.ID)
        	window.localStorage.setItem('fullName',tempUser.fullName)
        	window.localStorage.setItem('clientType','master')
        	AuthS.auth().then(function(res){
        		d.resolve(res)
        	},function(err){
        		d.reject(err)
        	})
            
        },function(err){
        	d.reject(err)
        })
        return d.promise
	}

	return {
		sendPhoneNumberToServer:sendPhoneNumberToServer,
		validateSmsCode:validateSmsCode,
		createStudentUser:createStudentUser,
		createMasterUser:createMasterUser 
	}
}]);