const StatsArray = [
  ["Active Students", "5k"],
  ["Mentors", "10k"],
  ["Courses", "200+"],
  ["Awards", "50+"],
];
function Stats() {
  return (
    <div className="mx-auto flex max-w-maxContent flex-col items-center gap-5 p-20 text-center sm:flex-row">
      {StatsArray.map(([key, value], idx) => (
        <div key={idx} className="flex-1">
          <p className="text-center text-3xl font-bold text-richBlack-5">
            {value}
          </p>
          <p className="font-semibold text-richBlack-500">{key}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;
