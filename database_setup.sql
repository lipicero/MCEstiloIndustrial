-- Base de datos para MCEstiloIndustrial
-- Generado: 17-11-2025

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mcei`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
-- Contraseña por defecto para 'admin' es 'admin' (hasheada con bcrypt)
--

INSERT INTO `users` (`id`, `usuario`, `password`) VALUES
(1, 'admin', '$2b$10$Fs.A3uVrpNaSNx86s2d7a.VlbRBYDZKjKvDMHJdEn.WkideL0pWqK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

DROP TABLE IF EXISTS `galeria`;
CREATE TABLE `galeria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `img_id` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `galeria` (ejemplos iniciales)
--

INSERT INTO `galeria` (`id`, `descripcion`, `categoria`, `img_id`, `file`) VALUES
(1, 'Mesa de comedor con estructura metálica', 'muebles', NULL, 'img1.webp'),
(2, 'Rack de estantería industrial', 'muebles', NULL, 'img2.webp'),
(3, 'Repisa flotante en hierro y madera', 'muebles', NULL, 'img3.webp'),
(4, 'Portón corredizo de hierro con estilo moderno', 'portones', NULL, 'img7.webp'),
(5, 'Reja de seguridad para ventana', 'rejas', NULL, 'img12.webp'),
(6, 'Estructura metálica para fábrica', 'estructuras', NULL, 'img17.jpg');

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
