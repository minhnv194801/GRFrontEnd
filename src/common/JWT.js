function parseJwt (token) {
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    }
}
  
function isExpireJwt(token) {
    var payload = parseJwt(token)
    if (Math.floor(Date.now() / 1000) > payload.exp) {
        return true
    } else {
        return false
}
}

async function refreshTokenIfNeeded(sessionkey, refreshkey) {
    if (!sessionkey) {
        return {
            "isRefresh": false
        }
    }

    if (!isExpireJwt(sessionkey)) {
        return {
            "isRefresh": false
        }
    }

    if (refreshkey) {
        if (isExpireJwt(refreshkey)) {
            return {
                "isRefresh": true,
                "refreshkey": null,
                "sessionkey": null,
            }
            // dispatch(displayFailure({
            // "title": "Đăng xuất",
            // "content": "Phiên đăng nhập của bạn đã hết hạn. Xin hãy đăng nhập lại",
            // }))
        }

        try {
            const response = await fetch('http://localhost:8081/api/v1/auth/refresh', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': refreshkey,
                },
            })
            if (response.ok) {
                // convert data to json
                const json = await response.json();
                json.isRefresh = true
                return json
            } else {
                return {
                    "isRefresh": true,
                    "refreshkey": null,
                    "sessionkey": null,
                }
            }
        } catch(error) {
            return {
                "isRefresh": false,
                "refreshkey": null,
                "sessionkey": null,
            }
        }
    } else {
        return {
            "isRefresh": false,
            "refreshkey": null,
            "sessionkey": null,
        }
    }
}

export default refreshTokenIfNeeded