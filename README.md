Website of https://cinquin-maeva.com/

![MaevaCinquin](https://cinquin-maeva.com/themes/maeva/assets/images/principal/Photo_Maquillage_Palette_Rouge_a_Levre.jpeg)

# Maeva Cinquin

This is the repository for the website of MaevaCinquin, a Professional makeup artist

- [Installation](#installation)
- [Configuration](#configuration)
- [Integrations](#integrations)

## Installation

To use WordPlate, you need to have PHP 7.3+ and MySQL 5.7+ installed on your machine. 

WordPlate utilizes [Composer](https://getcomposer.org/) to manage its dependencies. So, before using WordPlate, make sure you have Composer installed on your machine.

```sh
composer install
npm install
npm run build
```

Update the database credentials in the `.env` file:

```
DB_NAME=database
DB_USER=username
DB_PASSWORD=password
```

Serve your application using the [built-in web server in PHP](https://www.php.net/manual/en/features.commandline.webserver.php) (or your server of choice) from the `public` directory:

```sh
php -S localhost:8000 -t public/
```

Visit your application in the browser:

- [`http://localhost:8000/`](http://localhost:8000/) - Your website.
- [`http://localhost:8000/wordpress/wp-admin`](http://localhost:8000/wordpress/wp-admin) - The administration dashboard.

## Configuration

### Public Directory

After installing WordPlate, you should configure your web server's document / web root to be the `public` directory. The `index.php` in this directory serves as the front controller for all HTTP requests entering your application.

### Salt Keys

The next thing you should do after installing WordPlate is adding salt keys to your environment file.

Typically, these strings should be 64 characters long. The keys can be set in the `.env` environment file. If you have not copied the `.env.example` file to a new file named `.env`, you should do that now. **If the salt keys isn't set, your user sessions and other encrypted data will not be secure.**

If you're lazy like us, [visit our salt key generator](https://wordplate.github.io/salt) and copy the randomly generated keys to your `.env` file.

### Environment Configuration

It is often helpful to have different configuration values based on the environment where the application is running. For example, you may wish to use a different database locally than you do on your production server.

To make this a cinch, WordPlate utilizes the [Dotenv](https://symfony.com/doc/current/components/dotenv) PHP package by Symfony. In a fresh WordPlate installation, the root directory of your application will contain a `.env.example` file. If you install WordPlate via Composer, this file will automatically be renamed to `.env`. Otherwise, you should rename the file manually.

Your `.env` file should not be committed to your application's source control, since each developer / server using your application could require a different environment configuration. Furthermore, this would be a security risk in the event an intruder gains access to your source control repository, since any sensitive credentials would get exposed.

Read more about environment variables in Laravel's documentation:

- [Environment Variable Types](https://laravel.com/docs/7.x/configuration#environment-variable-types)
- [Retrieving Environment Configuration](https://laravel.com/docs/7.x/configuration#retrieving-environment-configuration)

## Laravel Mix

```sh
// Run all mix tasks...
npm run dev

// Run all mix tasks and minify output...
npm run build
```
