import datetime

def calculate_total_time(log_entries):
    total_duration = datetime.timedelta()

    for entry in log_entries:
        start_time, end_time, break_time = parse_entry(entry)
        work_duration = end_time - start_time - break_time
        total_duration += work_duration

    return total_duration

def parse_entry(entry):
    start_str, end_str, break_str = entry.split(" - ")

    start_time = datetime.datetime.strptime(start_str, "%H:%M")
    end_time = datetime.datetime.strptime(end_str, "%H:%M")
    break_time = calculate_break_duration(break_str)

    return start_time, end_time, break_time

def calculate_break_duration(break_str):
    break_start_str, break_end_str = break_str.split(" ")

    break_start_time = datetime.datetime.strptime(break_start_str, "%H:%M")
    break_end_time = datetime.datetime.strptime(break_end_str, "%H:%M")
    break_duration = break_end_time - break_start_time

    return break_duration

def main():
    log_entries = [
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00",
        "08:00 12:00 - 01:00 05:00"
    ]

    total_duration = calculate_total_time(log_entries)

    print("Total Time Spent:", total_duration)

if __name__ == '__main__':
    main()
