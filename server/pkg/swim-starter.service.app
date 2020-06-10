[Unit]
Description=Swim todo
Wants=network.target

[Service]
EnvironmentFile=-/etc/sysconfig/swim-todo
ExecStart=/opt/swim-todo/bin/swim-todo
User=swim-todo
Restart=on-failure
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
