-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 22-06-2020 a las 17:40:16
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
  `razon_social` text NOT NULL,
  `cuit` varchar(13) NOT NULL,
  `domicilio` text NOT NULL,
  `id_tipo_cliente` int(11) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `fecha_alta` date NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `baja` date DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `tx_cliente`, `razon_social`, `cuit`, `domicilio`, `id_tipo_cliente`, `observaciones`, `fecha_alta`, `id_usuario`, `baja`) VALUES
(1, 'Pampa Natural', 'S A IMPORTADORA Y EXPORTADORA DE LA PATAGONIA', '30506730038', 'INT PEREZ QUINTANA 3850', 0, 'x', '2020-06-01', 88, NULL),
(2, 'Granix', 'ASOCIACION ARGENTINA DE LOS ADVENTISTAS DEL SEPTIMO DIA', '30500974016', 'Avda Brunengo', 0, 'x', '2020-06-01', 88, NULL),
(3, 'MANERA ELOY', 'MANERA ELOY', '20275971791', 'x', 0, 'x', '2020-06-01', 88, NULL),
(4, 'ISAPAM', 'ISAPAM SRL', '30671560945', 'Calle 16 Nro 658', 0, 'x', '2020-06-01', 88, NULL),
(5, 'PORTU CARLOS', 'PORTU CARLOS ALBERTO', '20108796937', 'Calle 26 Nro 54', 0, 'x', '2020-06-01', 88, NULL),
(6, 'ANTAR SA', 'ANTAR SA', '30671606538', 'CIRCUNVALACION J LA GIOIOSA 166', 0, 'x', '2020-06-01', 88, NULL),
(7, 'EVOLUCIONAR', 'EVOLUCIONAR SRL', '30710449062', 'Calle 18 Nro 768', 0, 'x', '2020-06-01', 88, NULL),
(33, 'Changomas', 'Walmart Argentina SRL', '30111111119', 'Capital Federal', 0, 'x', '2020-06-02', 88, NULL),
(34, 'Banco Hipotecario', 'Banco Hipotecario', '30222222228', 'Capital Federal', 0, 'x', '2020-06-02', 88, NULL),
(35, 'Granos del Oeste', 'Granos del Oeste SRL', '30333333337', 'Avda Brunengo', 0, 'x', '2020-06-02', 88, NULL),
(36, 'Centro Bulonero', 'Centro Bulonero SRL', '30444444446', 'Calle 9 Nro 1250', 0, 'x', '2020-06-02', 88, NULL),
(37, 'ICBC', 'Banco ICBC', '30555555554', 'Capital Federal', 0, 'x', '2020-06-02', 88, NULL),
(38, 'Oscar Ale', 'Oscar Ale', '30147773335', 'Calle 32 Nro 154', 0, 'Rotiseria', '2020-06-19', 88, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes_tipo`
--

CREATE TABLE IF NOT EXISTS `clientes_tipo` (
  `id_tipo_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tx_tipo_cliente` varchar(50) NOT NULL,
  `baja` date DEFAULT NULL,
  PRIMARY KEY (`id_tipo_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `clientes_tipo`
--

INSERT INTO `clientes_tipo` (`id_tipo_cliente`, `tx_tipo_cliente`, `baja`) VALUES
(1, 'Abono Mensual (F)', '2020-04-18'),
(2, 'Eventual (F)', NULL),
(3, 'Prospect', NULL),
(4, 'Abono Mensual (SF)', NULL),
(5, 'Eventual (SF)', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cta_cte`
--

CREATE TABLE IF NOT EXISTS `cta_cte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `tipo_doc` varchar(2) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `factura` varchar(13) NOT NULL,
  `cheque` varchar(15) NOT NULL,
  `observaciones` varchar(300) NOT NULL,
  `fecha_alta` date NOT NULL,
  `baja` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `cta_cte`
--

INSERT INTO `cta_cte` (`id`, `id_cliente`, `tipo_doc`, `monto`, `factura`, `cheque`, `observaciones`, `fecha_alta`, `baja`) VALUES
(1, 4, 'FC', '-2500.00', 'A0001-0000888', '', 'abono agosto', '2020-01-01', NULL),
(2, 4, 'FC', '-678.08', 'A0001-0000154', '', 'abono enero', '2020-06-19', NULL),
(3, 11, 'RC', '2000.00', '', 'BLP 567', 'Pago a cuenta', '2020-06-13', NULL),
(4, 4, 'FC', '-200.50', 'A0001-0000333', '', 'abono febrero', '2020-06-13', NULL),
(5, 4, 'RC', '100.00', '', 'BLP 555', 'pago a cuenta', '2020-06-14', NULL),
(6, 1, 'FC', '-92000.00', 'A0001-0000123', '', '', '2020-06-15', NULL),
(7, 37, 'FC', '-2500.00', 'A0001-0000123', '', '', '2020-06-15', NULL),
(8, 2, 'RC', '123.00', '', 'BLP 999', 'x', '2020-06-15', NULL),
(9, 3, 'RC', '1900.00', '', 'RIO 777', 'va', '2020-06-17', NULL),
(10, 38, 'FC', '-3388.00', '0001-0000238', '', 'servicio nov 2019', '2019-11-27', NULL),
(11, 38, 'RC', '34000.00', '', 'blp 754', 'hghgghghhg', '2020-06-18', NULL),
(12, 38, 'FC', '-3388.00', '0001-0000254', '', 'serv div 2019', '2020-06-19', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE IF NOT EXISTS `dispositivos` (
  `id_dispositivo` int(11) NOT NULL,
  `tx_dispositivo` varchar(3) NOT NULL,
  `tipo_dispositivo` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `x_pos` int(11) NOT NULL,
  `y_pos` int(11) NOT NULL,
  `toolpit_pos` varchar(1) NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id_dispositivo`, `tx_dispositivo`, `tipo_dispositivo`, `id_plano`, `x_pos`, `y_pos`, `toolpit_pos`, `fecha_alta`, `fecha_baja`) VALUES
(1, '01', 4, 1, 10, 10, 'L', '2020-01-01', NULL),
(2, '02', 4, 2, 20, 20, 'T', '2020-01-01', NULL),
(3, '03', 4, 1, 30, 30, 'B', '2017-12-07', NULL),
(4, '04', 4, 2, 40, 40, 'R', '2017-12-07', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos_cebaderas_ref`
--

CREATE TABLE IF NOT EXISTS `dispositivos_cebaderas_ref` (
  `id_referencia` int(11) NOT NULL AUTO_INCREMENT,
  `tx_referencia` varchar(75) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_referencia`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `dispositivos_cebaderas_ref`
--

INSERT INTO `dispositivos_cebaderas_ref` (`id_referencia`, `tx_referencia`, `descripcion`, `fecha_alta`, `fecha_baja`) VALUES
(1, 'falta cebo / reposición', '', '2017-12-07', NULL),
(2, 'cebo deteriorado / reposición', '', '2017-12-07', NULL),
(3, 'consumo de cebo / reposición', '', '2017-12-07', NULL),
(4, 'reposición de etiqueta', '', '2017-12-07', NULL),
(5, 'reposición de señalador', '', '2017-12-07', NULL),
(6, 'cebo roído / sin resposición', '', '2017-12-07', NULL),
(7, 'aceptable', '', '2017-12-07', NULL),
(8, 'obstruida', '', '2017-12-07', NULL),
(9, 'rota / reposición', '', '2017-12-07', NULL),
(10, 'ausencia de estación', '', '2017-12-07', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos_monitoreos`
--

CREATE TABLE IF NOT EXISTS `dispositivos_monitoreos` (
  `id_monitoreo` int(11) NOT NULL AUTO_INCREMENT,
  `id_dispositivo` int(11) NOT NULL,
  `id_referencia` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_monitoreo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `dispositivos_monitoreos`
--

INSERT INTO `dispositivos_monitoreos` (`id_monitoreo`, `id_dispositivo`, `id_referencia`, `fecha`) VALUES
(1, 1, 7, '2020-05-09'),
(2, 2, 7, '2020-05-09'),
(3, 3, 7, '2020-05-09'),
(4, 4, 7, '2020-05-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos_tipo`
--

CREATE TABLE IF NOT EXISTS `dispositivos_tipo` (
  `id_dispositivo` int(11) NOT NULL,
  `tx_dispositivo` text NOT NULL,
  `baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dispositivos_tipo`
--

INSERT INTO `dispositivos_tipo` (`id_dispositivo`, `tx_dispositivo`, `baja`) VALUES
(1, 'trampa de pegamento', NULL),
(2, 'trampera', NULL),
(3, 'Jaula', NULL),
(4, 'estacion cebadera', NULL),
(5, 'punto de gel', NULL),
(6, 'trampa uv', NULL),
(7, 'fly buster', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planos`
--

CREATE TABLE IF NOT EXISTS `planos` (
  `id_plano` int(11) NOT NULL,
  `tx_plano` varchar(30) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `planos`
--

INSERT INTO `planos` (`id_plano`, `tx_plano`, `id_sucursal`, `img_url`, `fecha_alta`, `fecha_baja`) VALUES
(1, 'Primera Barrera', 1, '', '2020-01-01', NULL),
(2, 'Segunda y Tercera Barrera', 1, '', '2020-01-01', NULL),
(3, 'Trampas de Luz', 1, '', '2020-01-01', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remitos`
--

CREATE TABLE IF NOT EXISTS `remitos` (
  `id_remito` int(11) NOT NULL AUTO_INCREMENT,
  `nro_remito` varchar(25) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fecha` date NOT NULL,
  `file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_remito`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `remitos`
--

INSERT INTO `remitos` (`id_remito`, `nro_remito`, `id_cliente`, `descripcion`, `fecha`, `file_name`) VALUES
(1, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592331921110.png'),
(2, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592434455172.png'),
(3, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592434689633.jpg'),
(4, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592434813863.png'),
(5, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592434931340.png'),
(6, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592435150849.png'),
(7, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592439873531.png'),
(8, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592440237755.pdf'),
(9, '', 0, '', '2020-06-18', ''),
(10, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592448605437.png'),
(11, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592448725334.png'),
(12, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592449003803.png'),
(13, '', 0, '', '0000-00-00', '/uploads/remitos/IMAGE-1592519585917.jpg'),
(14, '', 0, '', '2020-01-10', '/uploads/remitos/IMAGE-1592523304309.pdf'),
(15, '', 0, 'Invalid Date', '2020-12-31', '/uploads/remitos/IMAGE-1592523999111.pdf'),
(16, '', 0, 'suc 113 - Zapala', '2020-08-13', '/uploads/remitos/IMAGE-1592524121772.pdf'),
(17, '0002-00000153', 37, 'Suc 82 - Fernandez Oro', '0000-00-00', '/uploads/remitos/IMAGE-1592525318056.pdf'),
(18, '0002-00000153', 37, 'Suc 82 - Fernandez Oro', '0000-00-00', '/uploads/remitos/IMAGE-1592525438857.pdf'),
(19, '0002-00000153', 37, 'Suc 82 - Fernandez Oro', '2020-04-25', '/uploads/remitos/IMAGE-1592525489708.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE IF NOT EXISTS `sucursales` (
  `id_sucursal` int(11) NOT NULL AUTO_INCREMENT,
  `tx_sucursal` varchar(50) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `observaciones` varchar(300) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date DEFAULT NULL,
  PRIMARY KEY (`id_sucursal`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id_sucursal`, `tx_sucursal`, `id_cliente`, `domicilio`, `observaciones`, `id_usuario`, `fecha_desde`, `fecha_hasta`) VALUES
(1, 'Oficina y Plantas ', 1, 'Avenida Argentina 95', 'Gerente  Juan Perez', 0, '2020-04-18', NULL),
(2, 'Suc 21 - Catriel', 2, 'Avda Roca 35', 'Gerente Sr Gurruchaga', 88, '2020-04-18', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(1, 'Hernan', 'Carracedo', 'hernanpampa@gmail.com', '$2b$10$GQ0PclKh1llyXEuh2/je6e63MxQ7hwGxXda3.02UdSjC3DL21YEk6', '2020-04-09 20:11:32'),
(2, 'asd', 'asd', 'a@a.com', '$2b$10$J0XWUqaMllrsVUfHwjT.NOGQbrjrtD6yTk8Zl.Zidt4xl04X2RR4O', '2020-04-09 21:33:38'),
(3, 'Mauro', 'Schaab', 'maurin', '$2b$10$utievZvimehYU01YDf9L/.lpm6pZBiazodIwFdG2VNiOwd7PdcxES', '2020-06-14 13:50:36');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
