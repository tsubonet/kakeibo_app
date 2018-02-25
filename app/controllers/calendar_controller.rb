class CalendarController < ApplicationController

    def month
  
      # TODO
      # 例外処理じゃなくて valid_date?をつかう
      
      begin
        Time.local(params[:year], params[:month])
        year, month = params[:year].to_i, params[:month].to_i
      rescue StandardError
        year, month = Time.new.year, Time.new.month
      end
  
      render_for_react(
        props: {
          date: {
            year: year,
            month: month,
            day: 1,
          },
          records: Record.where(done_on: Time.new(year, month, 1).all_month),
        },
      )
    end
  
  
    def day
  
      begin
        Time.local(params[:year], params[:month], params[:day])
        year, month, day = params[:year].to_i, params[:month].to_i, params[:day].to_i
      rescue StandardError
        year, month, day = Time.new.year, Time.new.month, Time.new.day
      end
  
      render_for_react(
        props: {
          date: {
            year: year,
            month: month,
            day: day,
          },
          record: Record.find_by(done_on: "#{year}-#{month}-#{day}"),
        },
      )
    end
  
  
    def year
  
      begin
        Time.local(params[:year])
        year = params[:year].to_i
      rescue StandardError
        year = Time.new.year
      end

      records_year = []
      (1..12).each do |i|
        records_year << Record.where(done_on: Time.new(year, i, 1).all_month)
      end
  
      render_for_react(
        props: {
          date: {
            year: year,
            month: 1,
            day: 1,
          },
          recordsYear: records_year,
        },
      )
    end
  
  end