FROM debian:bookworm-20230202 as builder

WORKDIR /usr/app
COPY ./ ./

RUN apt update\
    && apt upgrade -y\
    && apt update\
    && apt install curl php-cli php-mbstring git unzip apache2 libapache2-mod-php php-mysql systemctl -y

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -\
    && apt install nodejs -y

RUN apt install -y lsb-release ca-certificates apt-transport-https software-properties-common gnupg2\
    && echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/sury-php.list \
    && curl -fsSL  https://packages.sury.org/php/apt.gpg| gpg --dearmor -o /etc/apt/trusted.gpg.d/sury-keyring.gpg\
    && apt install php8.2 libapache2-mod-php php-pear php8.2-cgi php8.2-common php8.2-curl php8.2-mbstring php8.2-zip php-net-socket php8.2-gd php8.2-mysql php8.2-bcmath php8.2-imagick php8.2-intl unzip wget git -y\
    && curl -sS https://getcomposer.org/installer -o composer-setup.php\
    && HASH=`curl -sS https://composer.github.io/installer.sig`\
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"\
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN apt install postfix -y
RUN echo '\nsmtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination\nmyhostname = vmi469907.contaboserver.net\nalias_maps = hash:/etc/aliases\nalias_database = hash:/etc/aliases\nmyorigin = /etc/mailname\nmydestination = $myhostname, mail@andy-cinquin.fr, vmi469907.contaboserver.net, localhost.contaboserver.net, localhost\nrelayhost = [smtp.gmail.com]:587\nmynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128\nmailbox_size_limit = 0\nrecipient_delimiter = +\ninet_interfaces = all\ninet_protocols = all\nsmtp_sasl_auth_enable = yes\nsmtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd\nsmtp_sasl_security_options = noanonymous\nsmtp_tls_CAfile = /etc/postfix/cacert.pem\nsmtp_use_tls = yes' >> /etc/postfix/main.cf
RUN echo "[smtp.gmail.com]:587 $MAIL_NAME:$MAIL_PASSWORD" > /etc/postfix/sasl_passwd
RUN chown root:root /etc/postfix/sasl_passwd
RUN chmod 0600 /etc/postfix/sasl_passwd
RUN postmap /etc/postfix/sasl_passwd

RUN npm install
RUN composer install
RUN npm run build

FROM builder as production

RUN sed -ri -e 's!/var/www/html!/usr/app/public!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!/usr/app/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf

RUN chmod -R 755 /usr/app
RUN chown -R www-data:www-data /usr/app

RUN a2enmod rewrite
RUN a2enmod headers

ENV PORT 80
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
