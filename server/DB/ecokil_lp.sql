-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 17-04-2020 a las 23:17:08
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ecokil_lp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tx_cliente` varchar(100) NOT NULL,
  `razon_social` text,
  `cuit` varchar(13) DEFAULT NULL,
  `domicilio` text,
  `id_tipo_cliente` int(11) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `fecha_alta` date NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `baja` date DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `tx_cliente`, `razon_social`, `cuit`, `domicilio`, `id_tipo_cliente`, `observaciones`, `fecha_alta`, `id_usuario`, `baja`) VALUES
(1, 'Banco Hipotecario', 'null', '30-10101010-5', 'Avenida Argentina 95 - Nqn', 2, 'borro la observaciones', '2019-04-01', 99, NULL),
(2, 'Club Santafesino', 'null', 'null', 'Rio Negro 3000 - Nqn', 4, 'club en el rio', '2019-06-03', 99, NULL),
(3, 'Casi Rodriguez SRL', NULL, NULL, NULL, 1, '', '2019-07-01', 1, NULL),
(4, 'Petrohard Srl', NULL, NULL, NULL, 1, '', '2019-08-01', 1, NULL),
(5, 'Paula Otero 55', 'null', 'null', 'Olascoaga 180 - Nqn', 3, 'Barrilo Los Olivos', '2019-06-01', 99, NULL),
(6, 'Dublin Resto Bar', NULL, NULL, NULL, 4, '', '2019-11-01', 1, NULL),
(7, 'CURLO SRL', NULL, NULL, NULL, 2, '', '2019-04-01', 1, NULL),
(8, 'Otero e hijas SRL', NULL, NULL, NULL, 2, 'Optica Sarmiento', '2019-04-01', 1, NULL),
(9, 'Panificadora Quimey', NULL, NULL, NULL, 5, '', '2019-11-01', 1, NULL),
(10, 'Daniel Gonzalez', NULL, NULL, NULL, 2, '20-14270401-4 Resp Insc (Frigorifico en Clte Cordero)', '2019-11-01', 1, NULL),
(11, 'Mariel (pinos)', NULL, NULL, NULL, 5, '', '2019-10-01', 1, NULL),
(12, 'Valeria Guillibran', NULL, NULL, 'La Sagala', 0, 'PINOS PINOS', '2019-11-01', 99, NULL),
(13, 'Mariela Herzig', NULL, NULL, NULL, 5, 'casa barrio Rincon de Emilio', '2019-11-01', 1, NULL),
(14, 'Alejandro Perez', NULL, NULL, NULL, 5, 'Casa barrio Rincon Club de Campo', '2019-11-01', 1, NULL),
(15, 'DRC Milanesas', NULL, NULL, NULL, 5, '', '2019-11-01', 1, NULL),
(16, 'Christian Gatica', NULL, NULL, NULL, 5, 'Casa en calle Egipto (Rincon de Emilio)', '2019-11-01', 1, NULL),
(17, 'Consorcio Edificio Villa Dolores', NULL, NULL, NULL, 2, 'cuit 30-71136510-5', '2019-11-01', 1, NULL),
(18, 'pepito 222', NULL, NULL, NULL, 99, 'sarasa saraa 33', '2019-04-10', 99, '2020-04-11'),
(19, 'dsfs', NULL, NULL, NULL, 3, 'dfafafdfdsa', '2020-04-11', 88, '2020-04-11'),
(20, '', NULL, NULL, NULL, 0, '', '0000-00-00', 0, '2020-04-11'),
(21, 'changomas', NULL, NULL, NULL, 4, 'sta rosa y pico', '2020-04-11', 0, '2020-04-11'),
(22, 'Cooperativa Obrera', NULL, NULL, NULL, 3, 'coope en el valle', '2021-01-22', 0, '2020-04-11'),
(23, 'La Pecsi', 'Pecsi Argentina SA', '30-11222333-0', 'Perticone 1800 - Nqn', 3, 'deposito', '2020-04-12', 99, NULL),
(24, 'x pampa natural', 'x dfgdf', 'x dggdgd', 'x gdgd', 4, 'x dgd', '2021-01-13', 99, NULL),
(25, 'ttttt', 'tttttt srl', '30-11222333-2', 'Perticone 1800 - Nqn', 3, 'eeeee', '2020-04-16', 88, '2020-04-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes_tipo`
--

CREATE TABLE IF NOT EXISTS `clientes_tipo` (
  `id_tipo_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tx_tipo_cliente` varchar(50) NOT NULL,
  `baja` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `clientes_tipo`
--

INSERT INTO `clientes_tipo` (`id_tipo_cliente`, `tx_tipo_cliente`, `baja`) VALUES
(1, 'Abono Mensual (F)', NULL),
(2, 'Eventual (F)', NULL),
(3, 'Prospect', NULL),
(4, 'Abono Mensual (SF)', NULL),
(5, 'Eventual (SF)', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE IF NOT EXISTS `dispositivos` (
  `id_dispositivo` int(11) NOT NULL,
  `tx_dispositivo` text NOT NULL,
  `baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id_dispositivo`, `tx_dispositivo`, `baja`) VALUES
(1, 'trampa de pegamento', NULL),
(2, 'trampera', NULL),
(3, 'Jaula', NULL),
(4, 'estacion cebadera', NULL),
(5, 'punto de gel', NULL),
(6, 'trampa uv', NULL),
(7, 'fly buster', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` text,
  `password` text,
  `created` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(1, 'Hernan', 'Carracedo', 'hernanpampa@gmail.com', '$2b$10$GQ0PclKh1llyXEuh2/je6e63MxQ7hwGxXda3.02UdSjC3DL21YEk6', '2020-04-09 20:11:32'),
(2, 'asd', 'asd', 'a@a.com', '$2b$10$J0XWUqaMllrsVUfHwjT.NOGQbrjrtD6yTk8Zl.Zidt4xl04X2RR4O', '2020-04-09 21:33:38');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
