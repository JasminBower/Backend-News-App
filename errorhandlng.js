exports.errorHandler = (err, req, res, next) => {
	if (err.code === "23503" || err.code === "22003")
		res.status(404).send({ msg: "article not found" });
	if (err.code === "22P02" || err.code === "42703")
		res.status(400).send({ msg: "Bad Request" });

	if (err.status) res.status(err.status).send({ msg: err.msg });

	res.status(500).send({ msg: "SERVER ERROR" });
};
