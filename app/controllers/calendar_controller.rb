class CalendarController < ApplicationController

  #before_action :authenticate_user!

  def month

    # TODO
    # 例外処理じゃなくて valid_date?をつかう
    
    begin
      Time.local(params[:year], params[:month])
      year, month = params[:year].to_i, params[:month].to_i
    rescue StandardError
      year, month = Time.new.year, Time.new.month
    end

    if current_user.nil?
      records = []
    else
      records = current_user.records.where(done_on: Time.new(year, month, 1).all_month)
    end

    render_for_react(
      props: {
        date: {
          year: year,
          month: month,
          day: 1,
        },
        records: records,
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

    if current_user.nil?
      records = []
    else
      records = current_user.records.where(done_on: Time.new(year, month, day))
    end

    render_for_react(
      props: {
        date: {
          year: year,
          month: month,
          day: day,
        },
        records: records,
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
      if current_user.nil?
        records = []
      else
        records = current_user.records.where(done_on: Time.new(year, i, 1).all_month)
      end
      records_year << records
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