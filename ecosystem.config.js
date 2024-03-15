module.exports = {
        apps : [
                {
                        name   : "CAS_DASHBOARD_NEW",
                        script : "./start.sh",
                        watch: ["."],
                        cwd: "/cas-new-service/cas-frontend/",
                        ignore_watch: ["./node_modules","./pids","./logs"],
                        error_file: "logs/CAS_DASHBOARD_NEW-error.log",
                        out_file: "logs/CAS_DASHBOARD_NEW-out.log",
                        pid_file: "pids/CAS_DASHBOARD_NEW.pid"
                        // port: "3002"
                }
		]
	}

