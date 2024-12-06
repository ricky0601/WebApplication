import java.io.*;
import java.util.*;

interface Storage {
    void save();
    void retrieve();
}

class FestivalModel implements Storage {
    private String name;
    private String place;
    private String type;
    private String date;

    public FestivalModel(String name, String place, String type, String date) {
        this.name = name;
        this.place = place;
        this.type = type;
        this.date = date;
    }

    public FestivalModel() {}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    // 저장 메서드
    public void save() {
        try (FileWriter fw = new FileWriter("festivals.txt", true)) {
            fw.write(name + "," + place + "," + type + "," + date + "\n");
            System.out.println(name + "이(가) 저장되었습니다.");
        } catch (IOException e) {
            System.out.println("파일 저장 중 오류가 발생했습니다.");
        }
    }

    // 행사 전체 조회 메서드
    public void retrieve() {
        File file = new File("festivals.txt");
        if (!file.exists() || file.length() == 0) {
            System.out.println("저장된 축제가 없습니다.");
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] festivalDetails = line.split(",");
                System.out.println("이름: " + festivalDetails[0]);
                System.out.println("장소: " + festivalDetails[1]);
                System.out.println("유형: " + festivalDetails[2]);
                System.out.println("날짜: " + festivalDetails[3]);
                System.out.println("-----------------------------");
            }
        } catch (IOException e) {
            System.out.println("파일 읽기 중 오류가 발생했습니다.");
        }
    }

    // 행사명 검색 메서드
    public void searchByKeyword(String keyword) {
        File file = new File("festivals.txt");
        if (!file.exists() || file.length() == 0) {
            System.out.println("저장된 축제가 없습니다.");
            return;
        }

        boolean found = false;
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] festivalDetails = line.split(",");
                String festivalName = festivalDetails[0];

                // 행사명이 키워드를 포함하면 출력
                if (festivalName.contains(keyword)) {
                    System.out.println("찾은 행사: ");
                    System.out.println("이름: " + festivalDetails[0]);
                    System.out.println("장소: " + festivalDetails[1]);
                    System.out.println("유형: " + festivalDetails[2]);
                    System.out.println("날짜: " + festivalDetails[3]);
                    System.out.println("-----------------------------");
                    found = true;
                }
            }
            if (!found) {
                System.out.println("검색한 키워드가 포함된 행사를 찾을 수 없습니다.");
            }
        } catch (IOException e) {
            System.out.println("파일 읽기 중 오류가 발생했습니다.");
        }
    }
}

class CreateCal {
    Scanner scan = new Scanner(System.in);
    boolean breakPoint = true;

    void test() {
        while (breakPoint) {
            System.out.print("행사 및 축제 이름을 입력하세요. :");
            String name = scan.next();
            System.out.print("행사 및 축제 장소를 입력하세요. :");
            String place = scan.next();
            System.out.print("행사 및 축제 유형을 입력하세요. :");
            String type = scan.next();
            System.out.print("행사 및 축제 날짜를 입력하세요. :");
            String date = scan.next();

            FestivalModel fm = new FestivalModel(name, place, type, date);
            fm.save();  // 행사 정보 저장
            breakPoint = false;
        }
    }
}

class Festival {
    public static void main(String args[]) {
        Scanner scan = new Scanner(System.in);
        boolean breakPoint = true;

        while (breakPoint) {
            System.out.println("* 시흥시 행사 관리 시스템 *");
            System.out.println("0. 그만하기");
            System.out.println("1. 축제 및 행사 추가");
            System.out.println("2. 축제 및 행사 조회");
            System.out.println("3. 행사명 검색");
            System.out.print("원하시는 기능을 입력하세요: ");
            int func_num = scan.nextInt();

            switch (func_num) {
                case 0:
                    System.out.println("시스템을 종료합니다.");
                    breakPoint = false;
                    break;
                case 1:
                    CreateCal createCal = new CreateCal();
                    createCal.test();
                    break;
                case 2:
                    // 축제 및 행사 조회 (파일 전체 출력)
                    FestivalModel fmRetrieve = new FestivalModel();
                    fmRetrieve.retrieve();
                    break;
                case 3:
                    // 행사명 검색
                    System.out.print("검색할 키워드를 입력하세요: ");
                    String keyword = scan.next();
                    FestivalModel fmSearch = new FestivalModel();
                    fmSearch.searchByKeyword(keyword);
                    break;
                default:
                    System.out.println("정해진 범위 안에서 골라주세요.\n");
                    break;
            }
        }
    }
}
